import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateUserSchema from "../schema/updateUserSchema";
import { updateUser } from "../store/slices/userAuthSlice";

const UserForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:{
      name: null,
      email: null,
      phone: null,
      password: null
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data) => {
    const dispatchAction = await dispatch(updateUser(data));

    if (dispatchAction.payload.error) {
      setError("root", { message: dispatchAction.payload.error });
    } else {
      setIsModalOpen(false);
      reset();
    }
  };

  return (
    <div className="lg:h-fit lg:sticky lg:top-[6.2rem] mb-4 lg:mb-0 flex flex-col gap-4">
      <h2 className="text-2xl text-gray-700 font-semibold">Edit User</h2>
      {errors.root && <ErrorMessage error={errors.root?.message} />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder="Name"
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
          />
          {errors.name && <ErrorMessage error={errors.name.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            placeholder="Email"
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("phone")}
            placeholder="Phone"
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
          />
          {errors.phone && <ErrorMessage error={errors.phone.message} />}
        </div>
        <Button
          type="submit"
          text={isSubmitting ? "Saving..." : "Save"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};
export default UserForm;
