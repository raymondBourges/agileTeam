package fr.arbi.at.support;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import fr.arbi.at.JsonService;
import fr.arbi.at.Teams;
import fr.arbi.at.WsEndPoint;

@Configuration
public class ApplicationConfig {
    
    @Bean
    public Teams teams() {
        return new Teams();
    }

    @Bean
    public WsEndPoint wsEndPoint() {
        return new WsEndPoint();
    }
        
    @Bean
    public JsonService jsonService() {
        return new JsonService();
    } 
   
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}
