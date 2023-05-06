class RemoveInterestFromEvents < ActiveRecord::Migration[6.1]
  def change
    remove_reference :events, :interest, null: false
  end
end
