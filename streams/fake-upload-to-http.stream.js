import { Readable } from 'stream';

class FakeUploadToHttpStream extends Readable {
    constructor() {
        super();
        this.current = 1;
    }

    _read() {
        setTimeout(() => {

            if (this.current > 5) {
                this.push(null);
            } else {
                const buffer = Buffer.from(`${this.current++}\n`, 'utf-8');
                this.push(buffer);
            }

        }, 1000);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new FakeUploadToHttpStream(),
    duplex: 'half'

}).then(response => response.text().then( data => console.log(data)));