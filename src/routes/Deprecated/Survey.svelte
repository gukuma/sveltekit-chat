<script>

        let selected = "";
        
        function selectState(state) {
          selected = state;
        }
        const descriptions = {
    A: "A: I and my Persona are separate.",
    B: "B: I and my Persona are barely aligned.",
    C: "C: I and my Persona are somewhat aligned",
    D: "D: I and my Persona are closely aligned.",
    E: "E: I and my Persona are almost the same."
  };
    </script>
    
  
    
    <section class="pt-16 ">
        <div class="flex justify-between gap-10">
            {#each ['A', 'B', 'C', 'D', 'E'] as state}
              <button 
                class="p-4 w-32  rounded-md"
                on:click={() => selectState(state)}
              >
                {#if state === 'A'}
                A
                  <div class="relative">
                    <div class="circle w-12 h-12"></div>
                    <div class="circle w-10 h-10 absolute top-0 left-16"></div>
                  </div>
                {/if}
                {#if state === 'B'}
                B
                  <div class="relative">
                    <div class="circle w-12 h-12"></div>
                    <div class="overlap w-10 h-10 absolute top-0 left-10"></div>
                  </div>
                {/if}
                {#if state === 'C'}
                C
                  <div class="relative">

                    <div class="circle w-12 h-12"></div>
                    <div class="overlap w-10 h-10 absolute top-0 left-8"></div>
                  </div>
                {/if}
                {#if state === 'D'}
                D
                  <div class="relative">
                    <div class="circle w-12 h-12"></div>
                    <div class="overlap w-10 h-10 absolute top-0 left-6"></div>
                  </div>
                {/if}
                {#if state === 'E'}
                E
                  <div class="relative">
                    <div class="overlap w-10 h-10 absolute top-0 left-4"></div>
                    <div class="circle w-12 h-12"></div>
                 
                  </div>
                {/if}
              </button>
            {/each}
          </div>
          
          <div class="mt-4">
            {selected ? descriptions[selected] : "Select a state to see the description."}
        </div>
          
    </section>
    
      
      <style>
      .circle {
        border-radius: 50%;
        border: 4px solid black;
      }
    
      .overlap {
        position: absolute;
        border: 4px solid black;
        border-radius: 50%;
      }
    
      .selected .circle,
      .selected .overlap {
        border-color: red;
      }
      </style>
      
      