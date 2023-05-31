import { apiSlice } from "../apiSlice"
import { logOut, setCredentials } from "../authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUp: builder.mutation({
            query: (initialUserData) => ({

                url: "/auth/signup",
                method: "POST",
                body: {
                    ...initialUserData,
                },
            }),
            //invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    //const { data } =
                    await queryFulfilled
                    //console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);

                } catch (err) {
                    console.log(err)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice