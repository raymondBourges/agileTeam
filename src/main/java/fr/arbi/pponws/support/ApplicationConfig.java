package fr.arbi.pponws.support;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import fr.arbi.pponws.Teams;
import fr.arbi.pponws.WsEndPoint;

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
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}
