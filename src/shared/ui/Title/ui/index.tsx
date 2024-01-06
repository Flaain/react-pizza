import { Props } from "../model/interfaces";

const Title = ({ title }: Props) => <h1 className='text-primary-black text-3xl font-bold max-md:text-2xl'>{title}</h1>;

export default Title;