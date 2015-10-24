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
    void removeDeveloper(@PathVariable String teamName, @PathVariable String devName) {
        teams.getTeam(teamName).removeDeloper(devName);
    }

    @RequestMapping(value="/{teamName}/{devName}", method=RequestMethod.PUT)
    DeveloperInfo updateDeveloper(@PathVariable String teamName, @PathVariable String devName, @RequestBody DeveloperInfo developerInfo, HttpServletRequest req) {
        DeveloperInfo ret = teams.getTeam(teamName).updateDeveloperinfo(devName, developerInfo);
        try {
            Session session = container.connectToServer(ClientEndPoint.class,
                URI.create(String.format("ws://%s:%d/team", req.getServerName(), req.getServerPort())));
            session.getBasicRemote().sendText(jsonService.teamAsJson(teams.getTeam(teamName)));
            session.close();
        } catch (IOException | DeploymentException e) {
            new RuntimeException(e);
        }
        return ret;
    }
    
}
