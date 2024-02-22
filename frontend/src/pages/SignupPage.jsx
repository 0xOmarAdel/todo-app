import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { signup } from "../store/slices/userAuthSlice";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "../schema/signupSchema";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

const SignupPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const dispatchAction = await dispatch(signup(data));

    setError("root", { message: dispatchAction.payload });
  };

  return (
    <div className="min-h-screen w-full flex flex-row justify-center items-center">
      <Card className="w-80 flex flex-col gap-8">
        <h1 className="text-4xl text-gray-700 font-bold text-center">
          Sign Up
        </h1>
        {errors.root && <ErrorMessage error={errors.root.message} />}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <input
              className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
              {...register("password")}
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>
          <Button
            type="submit"
            text={isSubmitting ? "Loading..." : "Sign Up"}
            disabled={isSubmitting}
          />
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-sky-500 font-medium">
              Log In
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
