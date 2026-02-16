const commandDatabase = [];

const categories = ["network", "process", "logs", "services"];

categories.forEach(cat => {
    for (let i = 1; i <= 30; i++) {
        commandDatabase.push({
            category: cat,
            name: cat.toUpperCase() + "_COMMAND_" + i,
            description:
                "Enterprise-level explanation for " + cat +
                " command. Used in Blue Team monitoring, detection, and response workflows.",
            example: cat + "_command_" + i + " -option"
        });
    }
});
