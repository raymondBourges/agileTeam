package fr.arbi.pponws;

import java.util.HashMap;

import lombok.Getter;

@Getter
public class Teams {
    
    private HashMap<String, Team> teams = new HashMap<>();
    
    Team getTeam(String teamName) {
        Team ret = teams.get(teamName);
        if (ret == null) {
            ret = new Team();
            teams.put(teamName, ret);
        }
        return ret;
    }

}
