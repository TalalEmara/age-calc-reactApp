import React, {FormEvent, Fragment, useState} from 'react';
import styles from '../styles/input-form.module.css';

type InputErrors = {
    day?: string,
    month?: string,
    year?: string,
}

const InputForm = () => {
    const [errors, setErrors] = useState<InputErrors>({});
    const [formData, setFormData] = useState({
        day: '',
        month: '',
        year: '',
    });

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) {
            console.log("Fix validation errors before submitting.");
            return;
        }
        console.log("Form data submitted:", formData);
    };

    const validateInput = (field: string, value: string) => {
        const num = parseInt(value, 10);

        switch(field) {
            case "day":
                if (value && (isNaN(num) || num < 1 || num > 31)) {
                    setErrors((prev) => ({
                        ...prev,
                        day: 'Day must be between 1 and 31',
                    }));
                } else {
                    // Only clear field validation errors, not date validation errors
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        if (prev.day === 'Day must be between 1 and 31') {
                            newErrors.day = '';
                        }
                        return newErrors;
                    });
                }
                break;
            case 'month':
                if (value && (isNaN(num) || num < 1 || num > 12)) {
                    setErrors((prev) => ({
                        ...prev,
                        month: 'Month must be between 1 and 12',
                    }));
                } else {
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        if (prev.month === 'Month must be between 1 and 12') {
                            newErrors.month = '';
                        }
                        return newErrors;
                    });
                }
                break;
            case 'year':
                if (value && (isNaN(num) || num < 1950 || num > 2025)) {
                    setErrors((prev) => ({
                        ...prev,
                        year: 'Year must be between 1950 and 2025',
                    }));
                } else {
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        if (prev.year === 'Year must be between 1950 and 2025') {
                            newErrors.year = '';
                        }
                        return newErrors;
                    });
                }
                break;
        }
    };

    const validateFullDate = (day: string, month: string, year: string) => {
        // Only validate if all fields have values
        if (!day || !month || !year) return;

        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);

        if (isNaN(d) || isNaN(m) || isNaN(y)) return;

        // First clear any existing date-related errors
        setErrors((prev) => {
            const newErrors = { ...prev };
            // Clear date-related errors (but keep field validation errors)
            if (prev.day === 'Invalid date' || prev.day === 'Date cannot be in the future') {
                newErrors.day = '';
            }
            return newErrors;
        });

        const date = new Date(y, m - 1, d); // JavaScript Date uses 0-based months
        const isValidDate = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;

        if (!isValidDate) {
            setErrors((prev) => ({
                ...prev,
                day: 'Invalid date',
            }));
            return;
        }

        // Check if the date is in the future
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to end of today for comparison
        if (date > today) {
            setErrors((prev) => ({
                ...prev,
                day: 'Date cannot be in the future',
            }));
        }
    };

    const handleInputChange = (field: string, value: string) => {

        const newFormData = { ...formData, [field]: value };
        setFormData(newFormData);

        validateInput(field, value);

        setTimeout(() => {
            validateFullDate(newFormData.day, newFormData.month, newFormData.year);
        }, 0);
    };

    return (
        <Fragment>
            <form className={styles.inputForm} onSubmit={submitHandle}>
                <div className={styles.inputSection}>
                    <label>D A Y</label>
                    <input
                        type={'number'}
                        className={`${styles.inputField} ${errors.day ? styles.inputError : ''}`}
                        name={'dayInput'}
                        min={"1"}
                        max={"31"}
                        value={formData.day}
                        onChange={(e) => handleInputChange("day", e.target.value)}
                    />
                    {errors.day && <p className={styles.error}>{errors.day}</p>}
                </div>

                <div className={styles.inputSection}>
                    <label>M O N T H</label>
                    <input
                        type={'number'}
                        className={`${styles.inputField} ${errors.month ? styles.inputError : ''}`}
                        name={'monthInput'}
                        min={"1"}
                        max={"12"}
                        value={formData.month}
                        onChange={(e) => handleInputChange("month", e.target.value)}
                    />
                    {errors.month && <p className={styles.error}>{errors.month}</p>}
                </div>

                <div className={styles.inputSection}>
                    <label>Y E A R</label>
                    <input
                        type={'number'}
                        className={`${styles.inputField} ${errors.year ? styles.inputError : ''}`}
                        name={'yearInput'}
                        min={"1950"}
                        max={"2025"}
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                    />
                    {errors.year && <p className={styles.error}>{errors.year}</p>}
                </div>

                {/*<button type={"submit"}>Submit</button>*/}
            </form>
        </Fragment>
    );
};

export default InputForm;