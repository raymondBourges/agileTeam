package fr.arbi.pp.support;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import fr.arbi.pp.JsonService;
import fr.arbi.pp.Teams;
import fr.arbi.pp.WsEndPoint;

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
