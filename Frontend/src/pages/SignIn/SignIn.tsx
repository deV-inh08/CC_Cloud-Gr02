import React, { useContext } from 'react'
import image from "../../assets/imageRegister.png"
import { paths } from '../../constants/paths';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/app.context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema, schema } from '../../utils/rules';
import { useMutation } from '@tanstack/react-query';
import authAPI from '../../api/auth.api';
import { toast } from 'react-toastify';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import { ErrorResponse } from '../../utils/utils.type';
import Input from '../../components/Input';

type FormData = Omit<Schema, 'confirm_password'>

const signInSchema = schema.pick(['email', 'password']);

const SignIn = () => {

  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>(
    {
      resolver: yupResolver(signInSchema)
    }
  );

  const SigninAccoutMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authAPI.signinAccount(body)
  });

  const onSubmit = handleSubmit((data) => {
    SigninAccoutMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        navigate('/')
        toast.success(data.data.message, { autoClose: 1000 })
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(errors)) {
          const formError = errors.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
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
        <h1 className='font-medium text-5xl'>Log in to Exclusive</h1>
        <p className='mt-8 '>Enter your details below</p>

        <form onSubmit={onSubmit} action="" className='flex flex-col gap-7 mt-9'>
          <div>
            <Input
              register={register}
              name='email'
              type="email"
              errorMessage={errors.email?.message}
              classNameInput='border-b-2 border-ransparent outline-none focus:text-primaryColor/50 bg-transparent py-3 '
              placeholder='Enter your email'
            >
            </Input>

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
          <div className='flex items-center gap-10 text-primaryColor'>
            <button className='bg-primaryColor mt-3 md:w-[150px] text-gray-200 px-5 py-3 text-sm rounded hover:bg-primaryColor/70 transition-all'>Login</button>
            <p className=' mt-3'>Forget Password?</p>
          </div>
          <div>
            <Link to={paths.signup}>You don't have account ?</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SignIn;
