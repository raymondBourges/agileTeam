package fr.arbi.at;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeveloperInfo {
    
    private Integer vote;
    private Boolean voted;

    public DeveloperInfo() {
    }

    @Builder
    public DeveloperInfo(Integer vote, Boolean voted) {
        this.vote = vote;
        this.voted = voted;
    }

}
