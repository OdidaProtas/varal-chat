const ref = async (promise) => {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error]
    }
}

export default ref;
