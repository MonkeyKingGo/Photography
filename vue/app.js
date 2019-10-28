new Vue({
  el: '#notebook',
  data:
  {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
  },
  computed: {

      selectedNote() {
          return this.notes.find(note => note.id === this.selectedId)
      },
      notePreview() {
          return this.selectedNote ? marked(this.selectedNote.content) : ''
      },
  },
  watch: {
      notes: {
          handler: 'saveNotes',
          deep: true,     
      },
      selectedId(val, oldVal) {
      localStorage.setItem('selected-id', val)
      },
  },
  methods: {
      addNote() {
          const time = Date.now()
          const note = {
              id: String(time),
              title: "新建笔记" + (this.notes.length + 1),
              content: '这是啥玩意啊',
              created: time,
              favorite: false,
          }
          this.notes.push(note)
          this.selectedNote(note)
      },
      selectNote(note) {
          this.selectedId = note.id
      },
    
      saveNotes() {
          localStorage.setItem('notes', JSON.stringify(this.notes))
          console.log('Notes saved!', new Date())
      },
      del(id){
        var index=this.notes.findIndex(item=>{
          if(item.id=id){
            return true;
          }
        })
        this.notes.splice(index,1)
      },

  },
})