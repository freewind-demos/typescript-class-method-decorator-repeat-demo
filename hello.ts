function repeat(times: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i < times; i += 1) {
        await originalMethod.apply(this, args);
      }
    };
  }
}

class User {
  private count = 1;

  @repeat(3)
  hello() {
    console.log(`Count: ${this.count}`);
    this.count += 1;
  }
}


const user = new User()
user.hello()
