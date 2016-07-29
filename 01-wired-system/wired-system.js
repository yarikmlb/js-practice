var scheme1 = {
        name: 'Gate',
        type: 'XOR',
        children: [
            {
                name: 'Gate',
                type: 'AND',
                children: [
                    {
                        name: 'Switch',
                        type: 'ON',
                        state: 1
                    },
                    {
                        name: 'Switch',
                        type: 'OFF',
                        state: 0
                    }
                ]
            },
            {
                name: 'Gate',
                type: 'NOT',
                children: [
                    {
                        name: 'Switch',
                        type: 'ON',
                        state: 1
                    }
                ]
            }
        ]
    },
    scheme2 = {
        name: 'Gate',
        type: 'AND',
        children: [
            {
                name: 'Gate',
                type: 'OR',
                children: [
                    {
                        name: 'Switch',
                        type: 'ON',
                        state: 1
                    },
                    {
                        name: 'Gate',
                        type: 'XOR',
                        children: [
                            {
                                name: 'Switch',
                                type: 'OFF',
                                state: 0
                            },
                            {
                                name: 'Gate',
                                type: 'NOT',
                                children: [
                                    {
                                        name: 'Switch',
                                        type: 'ON',
                                        state: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Gate',
                type: 'NOT',
                children: [
                    {
                        name: 'Switch',
                        type: 'ON',
                        state: 1
                    }
                ]
            }
        ]
    },
    scheme3 = {
        name: 'Gate',
        type: 'XOR',
        children: [
            {
                name: 'Gate',
                type: 'NOT',
                children: [
                    {
                        name: 'Switch',
                        type: 'OFF',
                        state: 0
                    }
                ]
            },
            {
                name: 'Gate',
                type: 'OR',
                children: [
                    {
                        name: 'Gate',
                        type: 'OR',
                        children: [
                            {
                                name: 'Switch',
                                type: 'OFF',
                                state: 0
                            },
                            {
                                name: 'Gate',
                                type: 'AND',
                                children: [
                                    {
                                        name: 'Switch',
                                        type: 'OFF',
                                        state: 0
                                    },
                                    {
                                        name: 'Switch',
                                        type: 'ON',
                                        state: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Switch',
                        type: 'OFF',
                        state: 0
                    }
                ]
            }
        ]
    },
    scheme4 = {
        name: 'Gate',
        type: 'AND',
        children: [
            {
                name: 'Gate',
                type: 'OR',
                children: [
                    {
                        name: 'Gate',
                        type: 'AND',
                        children: [
                            {
                                name: 'Switch',
                                type: 'ON',
                                state: 1
                            },
                            {
                                name: 'Switch',
                                type: 'OFF',
                                state: 0
                            }
                        ]
                    },
                    {
                        name: 'Gate',
                        type: 'AND',
                        children: [
                            {
                                name: 'Switch',
                                type: 'ON',
                                state: 1
                            },
                            {
                                name: 'Switch',
                                type: 'ON',
                                state: 1
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Gate',
                type: 'AND',
                children: [
                    {
                        name: 'Gate',
                        type: 'OR',
                        children: [
                            {
                                name: 'Switch',
                                type: 'OFF',
                                state: 0
                            },
                            {
                                name: 'Switch',
                                type: 'ON',
                                state: 1
                            }
                        ]
                    },
                    {
                        name: 'Gate',
                        type: 'NOT',
                        children: [
                            {
                                name: 'Switch',
                                type: 'OFF',
                                state: 0
                            }
                        ]
                    }
                ]
            }
        ]
    };

var gates = {
    AND: function (arr) {
        return arr[0] && arr[1];
    },
    NOT: function (arr) {
        return +!arr[0];
    },
    XOR: function (arr) {
        return arr[0] ^ arr[1];
    },
    OR: function (arr) {
        return arr[0] || arr[1];
    }
};
var helpers = {
    getNodeType: function (node) {
        return node.name;
    },
    getAction: function (node) {
        return gates[node.type];
    }
};

function nodes(node) {
    var state;
    switch (helpers.getNodeType(node)) {
        case 'Switch':
            state = node.state;
            break;
        case 'Gate':
            var statesArray = [];
            var action = helpers.getAction(node);
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                statesArray.push(nodes(child));
            }
            state = action(statesArray);
            break;
    }
    return state;
}

console.info('scheme1', nodes(scheme1));
console.info('scheme2', nodes(scheme2));
console.info('scheme3', nodes(scheme3));
console.info('scheme4', nodes(scheme4));