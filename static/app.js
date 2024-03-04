new Vue({
    el: '#teacher-profiles',
    data: {
        teacherprofiles: []
    },
    created: function () {
        const vm = this;
        axios.get('/api/teacher-profiles/?format=json')
            .then(function (response) {
                vm.teacherprofiles = response.data
            })
    }
}
)