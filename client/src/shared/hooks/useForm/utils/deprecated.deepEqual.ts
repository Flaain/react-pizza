// export const deepEqual = <F extends Form, S extends Field>(obj1: F, obj2: S) => {
//     // if (Object.keys(obj1).length !== Object.keys(obj2).length) return true;

//     for (const key in obj1) {
//         if (key === "value") continue; 
//         /* value is dynamic property. First, we provide value as an argument to the register function. 
//             And then change it on every onChange action and it can throw error "Many re-renders" 
//             cuz of this condtion if (obj1[key] !== obj2[key]). So i decided to just skip value key 
//         */
//         if (!Object.prototype.hasOwnProperty.call(obj2, key)) return true;
//         if (typeof obj1[key] !== typeof obj2[key as keyof Field]) return true;
//         if (typeof obj1[key] === "object" && typeof obj2[key as keyof Field] === "object" && deepEqual(obj1[key], obj2[key as keyof Field])) return true;
//         if (obj1[key] !== obj2[key as keyof Field]) return true;
//     }

//     return false;
// };