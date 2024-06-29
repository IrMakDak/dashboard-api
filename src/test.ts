// npx tsx src/test.ts
import "reflect-metadata";

function Injectable(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata(key, 1, target);
    const meta = Reflect.getMetadata(key, target);
    console.log(meta, target, key);
  };
}

function Inject(name: string) {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    console.log(`Injected parameter ${parameterIndex} with token ${name}`);
  };
}
function Prop(target: Object, name: string) {}

@Injectable("hello")
export class First {
  @Prop prop: number;

  constructor() {
    this.prop = 1;
  }
}

@Injectable("bye")
export class Second {
  constructor(@Inject("hello") prop: First) {}
}
