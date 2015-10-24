package fr.arbi.at;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team {
    
    private HashMap<String, DeveloperInfo> developerInfos = new HashMap<>();
    private String name;
    
    @JsonCreator
    public Team(@JsonProperty("name") String name) {
        this.name = name;
    }

    public void removeDeloper(String devName) {
        developerInfos.remove(devName);
    }

    public DeveloperInfo updateDeveloperinfo(String devName, DeveloperInfo developerInfo) {
        developerInfos.put(devName, developerInfo);
        return developerInfos.get(devName);
    }

}
