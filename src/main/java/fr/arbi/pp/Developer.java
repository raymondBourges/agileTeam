package fr.arbi.pp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Developer {
    
    private String name;
    private String vote;
    private Boolean voted;

    public Developer() {
    }

    @Builder
    public Developer(String name, String vote, Boolean voted) {
        this.name = name;
        this.vote = vote;
        this.voted = voted;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Developer other = (Developer) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }

}
