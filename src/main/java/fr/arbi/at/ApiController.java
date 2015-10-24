package fr.arbi.at;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
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
    
    @RequestMapping(value="/{teamName}", method=RequestMethod.GET)
    Team getTeam(@PathVariable String teamName) {
        return teams.getTeam(teamName);
    }

    @RequestMapping(value="/{teamName}/{devName}", method=RequestMethod.DELETE)
    void removeDeveloper(@PathVariable String teamName, @PathVariable String devName) {
        teams.getTeam(teamName).removeDeloper(devName);
    }

    @RequestMapping(value="/{teamName}/{devName}", method=RequestMethod.PUT)
    DeveloperInfo updateDeveloper(@PathVariable String teamName, @PathVariable String devName, @RequestBody DeveloperInfo developerInfo) {
        DeveloperInfo ret = teams.getTeam(teamName).updateDeveloperinfo(devName, developerInfo);
        WsEndPoint.send(teams.getTeam(teamName));
        return ret;
    }
    
}
