const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
     
    },

    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
          'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
          name: 'Michael Foster',
          role: 'Co-Founder / CTO',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
       
      },
    // More posts...
  ]
  
  export default function Section() {
    return (
        <div>
          <link
            href="https://unpkg.com/tailwindcss@2.2.4/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <div className="bg-gray-100 py-10 px-14 flex justify-center">

            {/* Third Stats Container */}
            <div className="container mx-auto pr-4">
              <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-purple-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">BT OPT OUTS</p>
                </div>
                <p className="py-4 text-3xl ml-3">711</p>
              </div>
            </div>

            <div className="container mx-auto pr-4">
              <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-purple-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">BT OPT OUTS</p>
                </div>
                <p className="py-4 text-3xl ml-3">711</p>
              </div>
            </div>

            <div className="container mx-auto pr-4">
              <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-purple-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">BT OPT OUTS</p>
                </div>
                <p className="py-4 text-3xl ml-3">711</p>
              </div>
            </div>

            <div className="container mx-auto pr-4">
              <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-purple-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">BT OPT OUTS</p>
                </div>
                <p className="py-4 text-3xl ml-3">711</p>
              </div>
            </div>

            <div className="container mx-auto pr-4">
              <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-purple-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">BT OPT OUTS</p>
                </div>
                <p className="py-4 text-3xl ml-3">711</p>
              </div>
            </div>
           
          </div>
        </div>
      );
  }
  