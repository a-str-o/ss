import RegForm from "@/components/registerForm";

const RegisterFormContainer = () => {
  return (
    <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
      <div className="lg:w-[480px] ">
        <RegForm />
      </div>
    </div>
  );
};

export default RegisterFormContainer;
