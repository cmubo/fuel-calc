export default function timedPromise(seconds: number) {
    return new Promise((resolve) =>
        setTimeout(() => resolve(`Done in ${seconds} seconds`), seconds * 1000),
    );
}
