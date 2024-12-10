import React, { useContext } from 'react'
import image from "../../assets/imageRegister.png"
import { paths } from '../../constants/paths'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema, schema } from '../../utils/rules'
import { AppContext } from '../../contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../api/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../utils/utils.type'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


type FormData = Pick<Schema, "email" | "password" | "confirm_password">

const signupSchema = schema.pick([
  'email',
  'password',
  'confirm_password'
]);

const SignUp = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>(
    {
      resolver: yupResolver(signupSchema)
    }
  );

  const signupAccountMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.signupAccount(body)
  });

  const onSubmit = handleSubmit((data) => {
    const body = data;
    signupAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        navigate('/')
        toast.success(data.data.message, { autoClose: 1000 })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: "Server"
              })
            })
          }
        }
      }
    })
  });
  return (
    <section className='grid grid-cols-12 mt-20'>
      <div className='col-span-7 bg-cyan-400/40 w-[800px] h-[700px]'>
        <img src={image} alt="" />
      </div>
      <div className='col-span-5 mt-24 ml-5'>
        <h1 className='font-medium text-5xl'>Create an account</h1>
        <p className='mt-8 '>Enter your details below</p>

        <form onSubmit={onSubmit} autoComplete='off' method='post' className='flex flex-col gap-7 mt-9'>
          <div>
            <Input
              register={register}
              name='email'
              type="email"
              errorMessage={errors.email?.message}
              classNameInput='border-b-2 border-ransparent outline-none focus:text-primaryColor/50 bg-transparent py-3 '
              placeholder='Enter your email'
            ></Input>
          </div>
          <div>
            <Input
              register={register}
              name='password'
              type="password"
              errorMessage={errors.password?.message}
              classNameInput='border-b-2 border-ransparent outline-none focus:text-primaryColor/50 bg-transparent py-3 '
              placeholder='Enter your password'
            ></Input>
          </div>
          <div>
            <Input
              register={register}
              name="confirm_password"
              type="password"
              errorMessage={errors.confirm_password?.message}
              classNameInput='border-b-2 border-ransparent outline-none focus:text-primaryColor/50 bg-transparent py-3 '
              placeholder='Enter your confirm password'
            ></Input>
          </div>
          <button
            type='submit'
            className='bg-primaryColor mt-3 md:w-[316px] text-gray-200 px-5 py-3 text-sm rounded hover:bg-primaryColor/70 transition-all'
          >
            Create Account
          </button>
        </form>
        <p className='mt-6 text-gray-500'>Already have account? <Link className='text-primaryColor' to={paths.signin}>Log in</Link></p>
      </div>
    </section>
  )
}

export default SignUp
