
class Response<T> {
    status!: string;
    message!: string;
    data?: T | null;
}

export default Response