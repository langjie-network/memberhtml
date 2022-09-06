const { reactive } = Vue;

const gloable_state = reactive(
    {
        userInfo:{}
    }
);

export default gloable_state;
