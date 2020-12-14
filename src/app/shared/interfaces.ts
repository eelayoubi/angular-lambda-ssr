export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface Animal {
  id: number;
  name: string;
  age: string;
  address: Address;
  characteristics: [string]
}