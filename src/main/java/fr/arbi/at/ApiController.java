package fr.arbi.at;

import java.io.IOException;
import java.net.URI;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/v1")
public class ApiController {
    
    @Autowired
    Teams teams;
    
    @Autowired
    JsonService jsonService;

    private WebSocketContainer container;
    
    public ApiController() {
        this.container = ContainerProvider.getWebSocketContainer();
    }
    
    @RequestMapping(value="/{teamName}", method=RequestMethod.GET)
    Team getTeam(@PathVariable String teamName) {
        return teams.getTeam(teamName);
    }

    @RequestMapping(value="/{teamName}/{devName}", method=RequestMethod.DELETE)
    void removeDeveloper(@PathVariable String teamName, @PathVariable String devName, HttpServletRequest req) {
        Developer dev = Developer.builder().name(devName).build();
        teams.getTeam(teamName).removeDeloper(dev);
        updateTeanForWs(teamName, req);
    }

    @RequestMapping(value="/{teamName}/{devName}", method=RequestMethod.PUT)
    Developer updateDeveloper(@PathVariable String teamName, @PathVariable String devName, @RequestBody Developer developer, HttpServletRequest req) {
        developer.setName(devName);
        Developer ret = teams.getTeam(teamName).updateDeveloper(developer);
        updateTeanForWs(teamName, req);
        return ret;
    }
    
    @RequestMapping(value="/{teamName}/clean-votes", method=RequestMethod.POST)
    void cleanVotes(@PathVariable String teamName, HttpServletRequest req) {
        teams.getTeam(teamName).cleanVotes();
        updateTeanForWs(teamName, req);
    }

    @RequestMapping(value="/{teamName}/set-choices", method=RequestMethod.POST)
    void setChoices(@PathVariable String teamName, @RequestBody String[] choices, HttpServletRequest req) {
        teams.getTeam(teamName).setChoices(choices);
        updateTeanForWs(teamName, req);
    }

    private void updateTeanForWs(String teamName, HttpServletRequest req) {
        try {
            Session session = container.connectToServer(ClientEndPoint.class,
                URI.create(String.format("ws://%s:%d/team", req.getServerName(), req.getServerPort())));
            session.getBasicRemote().sendText(jsonService.teamAsJson(teams.getTeam(teamName)));
            session.close();
        } catch (IOException | DeploymentException e) {
            new RuntimeException(e);
        }
    }
    
}
