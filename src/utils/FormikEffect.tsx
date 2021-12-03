import { FormikContextType, useFormikContext } from 'formik';
import { useCallback, useEffect } from 'react';

//#endregion Styled Components
//#region Formik Helpers
interface FormikEffectProps<T> {
    onChange: (context: FormikContextType<T>) => void;
}
export const FormikEffect = <T extends unknown>({ onChange }: FormikEffectProps<T>) => {
    const context = useFormikContext<T>();

    useEffect(() => {
        onChange(context);
    }, [context, onChange]);

    return null;
};

