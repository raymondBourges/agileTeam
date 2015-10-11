package fr.arbi.pponws;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/pponws")
public class WsEndPoint {
    private static final Logger logger = Logger.getLogger(WsEndPoint.class.getName());
    static Queue<Session> queue = new ConcurrentLinkedQueue<>();
    
    public static void send(Team team) {
        try {
            for (Session session : queue) {
                Map<String,List<String>> requestParams = session.getRequestParameterMap();
                if (requestParams != null && requestParams.get("teamName") != null && requestParams.get("teamName").get(0).equals(team.getName())) {
                    session.getBasicRemote().sendText("TODO: Encode " + team.getName());                    
                }
            }
        } catch (IOException e) {
            logger.log(Level.WARNING, e.toString());
        }
    }

    @OnOpen
    public void open(Session session) {
        queue.add(session);
    }

    @OnClose
    public void close(Session session) {
        queue.remove(session);
    }

    @OnError
    public void error(Session session, Throwable t) {
        queue.remove(session);
    }
}

