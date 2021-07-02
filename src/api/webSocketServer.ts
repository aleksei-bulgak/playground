const url = (id: number) => `ws://18.192.37.20:80/game/${id}/player`;

export default class WebsocketServer {
    private server: WebSocket;
    private subscriptions: Array<(status: string) => void> = [];

    constructor(id: number) {
        this.server = new WebSocket(url(id));
        this.server.addEventListener('message', (event) => console.log('message', event));
        this.server.addEventListener('open', (data) => console.log('open', data));
        this.server.addEventListener('close', (data) => {
            console.log('close', data);
            this.subscriptions.forEach(callback => {
                callback('close')
            })
        });
        this.server.addEventListener('error', (data) => {
            console.log('error', data);
            this.subscriptions.forEach(callback => {
                callback('error')
            })
        });
    }

    sendMessage(message: string) {
        this.server.send(message);
    }

    close() {
        this.server.close();
    }

    subscribe(callback: (status: string) => void) {
        this.subscriptions.push(callback);
    }
}
