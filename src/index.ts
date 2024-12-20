class MapperFactory {
    
    constructor() {
        this.mappingJsonVariableKeyRecursively = this.mappingJsonVariableKeyRecursively.bind(this);
    }

    async mappingJsonVariableKeyRecursively(
        template: any,
        data: Record<string, any>
    ): Promise<any> {
        if (typeof template === "string") {
            // Check if the entire string is a placeholder like {{city}}
            if (/^{{(.*?)}}$/.test(template)) {
                const key = template.match(/^{{(.*?)}}$/)![1].trim();
                // Replace completely if key exists
                return data[key] !== undefined ? data[key] : template; 
            }
            // Replace placeholders within a string, like "Hello, {{name}}!"
            return template.replace(/{{(.*?)}}/g, (_, key) => {
                const trimmedKey = key.trim();
                return data[trimmedKey] !== undefined ? data[trimmedKey] : `{{${key}}}`;
            });
        } else if (Array.isArray(template)) {
            // Process each item in the array recursively
            return Promise.all(template.map((item) => this.mappingJsonVariableKeyRecursively(item, data)));
        } else if (typeof template === "object" && template !== null) {
            // Process each key-value pair in the object recursively
            const result: Record<string, any> = {};
            for (const key in template) {
                if (Object.prototype.hasOwnProperty.call(template, key)) {
                    result[key] = await this.mappingJsonVariableKeyRecursively(template[key], data);
                }
            }
            return result;
        } else {
            // Return the value as is for unsupported types
            return template;
        }
    }
}

export default new MapperFactory();
