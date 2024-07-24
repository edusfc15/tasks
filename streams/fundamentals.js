import { Readable, Writable, Transform } from 'stream';

class OneToOneHundredStream extends Readable {
    constructor() {
        super();
        this.current = 1;
    }

    _read() {
        setTimeout(() => {

            if (this.current > 100) {
                this.push(null);
            } else {
                const buffer = Buffer.from(`${this.current++}\n`, 'utf-8');
                this.push(buffer);
            }

        }, 1000);
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * 10;
        console.log(result);
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * -1;
        this.push(result.toString());
        callback();
    }
}

new OneToOneHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());