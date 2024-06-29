// npx tsx src/test.ts

function Component(id: number) {
  return (target: Function) => {
    target.prototype.id = id;
  };
}

function Method(
  target: Object,
  propertyKey: string, //method name
  propertyDescriptor: PropertyDescriptor
) {
  const oldValue = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: any[]) {
    return args[0] * 50;
  };
}

function Prop(
  target: Object,
  propertyKey: string //property name
) {
  let value: number;

  const getter = () => {
    return value;
  };

  const setter = (newValue: number) => {
    value = newValue;
    return value;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

function Param(target: Object, propertyKey: string, index: number) {
  console.log(propertyKey, index);
}

@Component(100)
export class User {
  @Prop id: number;

  constructor() {
    this.id = (this.constructor as any).prototype.id;
  }

  @Method
  updateId(@Param newId: number) {
    this.id = newId;
    return this.id;
  }
}

console.log(new User().updateId(10));
