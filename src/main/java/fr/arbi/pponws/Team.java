package fr.arbi.pponws;

import java.util.HashMap;

import lombok.Getter;

@Getter
public class Team {
    
    private HashMap<String, DeveloperInfo> developerInfos = new HashMap<>();

    public void removeDeloper(String devName) {
        developerInfos.remove(devName);
    }

    public DeveloperInfo updateDeveloperinfo(String devName, DeveloperInfo developerInfo) {
        developerInfos.put(devName, developerInfo);
        return developerInfos.get(devName);
    }

}
