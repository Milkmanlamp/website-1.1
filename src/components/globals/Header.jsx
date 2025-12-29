import { useFormError } from "@/context/formContext";

const Header = () => {
  const { hasErrors } = useFormError();
  
  return (
    <div className="flex flex-col items-center justify-center mt-5">
        <img 
          className='mb-4' 
          src={hasErrors ? "/Error.png" : "/GuavaMilk.png"} 
          alt="Guava Milk Logo" 
          width={250} 
          height={100}
        />
    </div>
  );
};
export default Header;

