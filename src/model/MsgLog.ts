export class MsgLog {
    queue: string[] = [];
    archive: string[] = [];
    msg(s: string, flash: boolean = false) {
        if (!flash) {
            this.archive.push(s);
        }
        this.queue.push(s);
        console.log(s);
    }
    dequeue() {
        this.queue.shift();
    }
    top() {
        return this.empty() ? '-' : this.queue[0];
    }
    clearQueue() {
        this.queue = [];
    }

    queuedMessages(): boolean {
        return this.len() > 1;
    }
    len(): number {
        return this.queue.length;
    }
    empty() {
        return !this.queue.length;
    }


}
