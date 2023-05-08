import throttle from 'lodash.throttle';

refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormClear);

updateInputValues();
const formValues = {};

function onFormInput(e) {
  new FormData(refs.form).forEach((value, name) => {
    formValues[name] = value;
  });

  save(STORAGE_KEY, formValues);
}

function updateInputValues() {
  const saveStorageValue = load(STORAGE_KEY);
  if (saveStorageValue) {
    const formVlues = Object.entries(saveStorageValue).forEach(value => {
      const inputEl = document.querySelector(`[name=${value[0]}]`);
      inputEl.value = value[1];
    });
  }
}

function onFormClear(e) {
  e.preventDefault();
  console.log(formValues);

  localStorage.removeItem(STORAGE_KEY);

  e.currentTarget.reset();
}
