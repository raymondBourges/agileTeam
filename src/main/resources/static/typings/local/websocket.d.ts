/**
 * Created by bourges on 04/01/16.
 */

interface Message {
    data: string;
}

interface WebSocketService {

    (url:string): WebSocketService;

    onMessage(callback: (message:Message) => void);

    onOpen(callback: () => void);

}