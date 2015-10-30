package fr.arbi.pp;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.fasterxml.jackson.databind.ObjectMapper;

@ServerEndpoint("/team")
public class WsEndPoint {
    private static final Logger logger = Logger.getLogger(WsEndPoint.class.getName());
    static Queue<Session> clients = new ConcurrentLinkedQueue<>();
    ObjectMapper mapper = new ObjectMapper();

    @OnMessage
    public void onMessage(String message, Session session) {
        try {
            Team team = mapper.readValue(message, Team.class);
            for (Session client : clients) {
                Map<String,List<String>> requestParams = client.getRequestParameterMap();
                if (requestParams != null && requestParams.get("teamName") != null && requestParams.get("teamName").get(0).equals(team.getName())) {
                    client.getBasicRemote().sendText(message);                    
                }
            }
        } catch (IOException e) {
            logger.log(Level.WARNING, e.toString());
        }        
    }
    
    @OnOpen
    public void open(Session session) {
        clients.add(session);
    }

    @OnClose
    public void close(Session session) {
        clients.remove(session);
    }

    @OnError
    public void error(Session session, Throwable t) {
        clients.remove(session);
    }
    
}

