package fr.arbi.pponws.support;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import fr.arbi.pponws.Teams;

@Configuration
public class ApplicationConfig {
    
    @Bean
    Teams teams() {
        return new Teams();
    }

}
