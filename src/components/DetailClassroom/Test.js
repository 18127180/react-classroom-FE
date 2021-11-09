import React from "react";

// const Test = () => {
//     return (
//         <div>
//             123
//         </div>
//     );
// };

const templates = {
    template1: {
        items: [1, 2]
    },
    template2: {
        items: [2, 3, 4]
    },
};

const Test = () => (
    <div>
        {
            Object.keys(templates).map(template_name => {
                return (
                    <div>
                        <div>{template_name}</div>
                        {
                            templates[template_name].items.map(item => {
                                return (<div>{item}</div>)
                            })
                        }
                    </div>
                )
            })
        }
    </div>
);

export default Test;
