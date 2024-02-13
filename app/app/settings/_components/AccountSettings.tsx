'use client';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const generalSettingsSchema = z.object({
    name: z.string(),
});

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

export const AccountSettings = () => {
    const { data } = useSession();
    console.log('data', data);

    const form = useForm({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            name: data?.user?.name || '',
        },
    });

    useEffect(() => {
        if (data?.user.name) {
            form.reset({
                name: data.user.name,
            });
        }
    }, [data, form, form.reset]);

    console.log('form', form.getValues('name'));

    return (
        <>
            {form.getValues('name')}
            {JSON.stringify(data?.user.name)}
            <SubsectionHeading
                title='Configuración general'
                subtitle='Configura tu cuenta'
            />
            <div className='max-w-md'>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ej. Juan'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </>
    );
};

type SubsectionHeadingProps = {
    title: string;
    subtitle: string;
};

const SubsectionHeading = ({ title, subtitle }: SubsectionHeadingProps) => {
    return (
        <div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm text-primary/40'>{subtitle}</p>
        </div>
    );
};
