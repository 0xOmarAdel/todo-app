import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userAuthSlice";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schema/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import Card from "../ui/Card";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const dispatchAction = await dispatch(login(data));

    if (dispatchAction.payload.error) {
      setError("root", { message: dispatchAction.payload.error });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-row justify-center items-center">
      <Card className="w-fit flex flex-col gap-8">
        <h1 className="text-4xl text-gray-700 font-bold text-center">Login</h1>
        {errors.root && <ErrorMessage error={errors.root.message} />}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <input {...register("email")} placeholder="Email" />
            {errors.email && <ErrorMessage error={errors.email.message} />}
          </div>
          <div className="flex flex-col gap-1">
            <input
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
            text={isSubmitting ? "Loading..." : "Log In"}
            disabled={isSubmitting}
          />
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-sky-500 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
