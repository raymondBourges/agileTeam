package fr.arbi.pponws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class StompController {
    
    @Autowired
    Teams teams;

    @MessageMapping("/teamInfo")
    @SendTo("/topic/team")
    public Team teamInfo(TeamMessage message) {
        return teams.getTeam(message.getTeamName());
    }

}