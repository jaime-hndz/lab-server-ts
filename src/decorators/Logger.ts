// Decorador que registra en consola el nombre del método y sus argumentos al ser invocado.
export function Logger(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`📌 Método llamado: ${key} con argumentos:`, args);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}
