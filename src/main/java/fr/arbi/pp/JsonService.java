package fr.arbi.pp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonService {
    
    ObjectMapper mapper = new ObjectMapper();
    
    public String teamAsJson(Team team) {
        String ret = "";
        try {
            ret = mapper.writeValueAsString(team);
        } catch (JsonProcessingException e) {
            new RuntimeException(e);
        }
        return ret;
    }

}
