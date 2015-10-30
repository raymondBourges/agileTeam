package fr.arbi.at;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team {
    
    private Set<Developer> developers = new HashSet<Developer>();
    private String name;
    private String[] choices = {"1", "2", "3", "5", "8", "13", "21", "34"};
    private Action lastAction;
    
    @JsonCreator
    public Team(@JsonProperty("name") String name) {
        this.name = name;
        this.lastAction = Action.CREATE;
    }

    public void removeDeloper(Developer developer) {
        developers.remove(developer);
        lastAction = Action.DELETE_DEV;
    }

    public Developer updateDeveloper(Developer developer) {
        if(!developers.add(developer)) {
            developers.remove(developer);
            developers.add(developer);
            lastAction = Action.UPDATE_DEV;
        } else {
            lastAction = Action.ADD_DEV;
        }
        return developer;
    }

    public void cleanVotes() {
        for (Developer developer : developers) {
            developer.setVote(null);
            developer.setVoted(false);
        }
        lastAction = Action.CLEAN_VOTES;
    }
    
    public void updateChoices(String[] choices) {
        this.choices = choices;
        lastAction = Action.CONFIG;
    }

}
