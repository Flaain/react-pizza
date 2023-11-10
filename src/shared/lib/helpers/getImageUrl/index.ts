export default (name: string) => {
    const path = `../../../../shared/assets/${name}`;
    return new URL(path, import.meta.url).href;
}